
import { GALOISX11, GALOISX13, GALOISX14, GALOISX2, GALOISX3, GALOISX9, INVMATCONSTANT, INVSBOX } from "../utils/calculatedMatrices.utils.js";
import { addRoundKey } from "./encrypt.services.js";

function inverseSubBytes(state: number[][]): number[][] {
    const newState: number[][] = [];
    for (let i = 0; i < 4; i++) {
        newState[i] = [];
        for (let j = 0; j < 4; j++) {
            const byte = state[i][j];
            const rowDigit = byte >> 4;
            const columnDigit = byte & 0x0f;
            newState[i][j] = INVSBOX[rowDigit][columnDigit];
        }
    }
    return newState;
};


function inverseShiftRows(state: number[][]): number[][] {
    const newState: number[][] = [];
    for (let i = 0; i < 4; i++) {
        newState[i] = [];
        for (let j = 0; j < 4; j++) {
            newState[i][(j + i) % 4] = state[i][j];
        }
    };
    return newState;
};


function inverseMixColumns(state: number[][]): number[][] {
    const newState: number[][] = [];
    for (let col = 0; col < 4; col++) {
        const originalColumn = state.map(row => row[col]);
        const newColumn = [0, 0, 0, 0];

        for (let i = 0; i < 4; i++) {
            newColumn[i] = INVMATCONSTANT[i].reduce((acc, multiplier, index) => {
                const value = originalColumn[index];
                const highNibble = value >> 4; // Parte alta (4 bits más significativos)
                const lowNibble = value & 0x0f; // Parte baja (4 bits menos significativos)
                if (multiplier === 1) return acc ^ value; // Multiplicador 1: XOR directo
                if (multiplier === 2) return acc ^ GALOISX2[highNibble][lowNibble]; // Multiplicador 2
                if (multiplier === 3) return acc ^ GALOISX3[highNibble][lowNibble]; // Multiplicador 3
                if (multiplier === 9) return acc ^ GALOISX9[highNibble][lowNibble]; // Multiplicador 9
                if (multiplier === 11) return acc ^ GALOISX11[highNibble][lowNibble]; // Multiplicador 11
                if (multiplier === 13) return acc ^ GALOISX13[highNibble][lowNibble]; // Multiplicador 13
                if (multiplier === 14) return acc ^ GALOISX14[highNibble][lowNibble]; // Multiplicador 14
                return acc;
            }, 0);
        };

        for (let row = 0; row < 4; row++) {
            if (!newState[row]) newState[row] = [];
            newState[row][col] = newColumn[row];
        };
    };

    return newState;
};

export function aesDecrypt(ciphertext: number[][][], roundKeys: number[][][]): string {
    // Aplicar ADDROUNDKEY inicial (última clave de ronda)
    let state = ciphertext.map(block => addRoundKey(block, roundKeys[10]));

    // Rondas 9 a 1
    for (let round = 9; round >= 1; round--) {
        state = state.map(block => {
            block = inverseShiftRows(block); // Inverse ShiftRows
            block = inverseSubBytes(block); // Inverse SubBytes
            block = addRoundKey(block, roundKeys[round]); // AddRoundKey
            return inverseMixColumns(block); // Inverse MixColumns
        });
    }

    // Última ronda (sin Inverse MixColumns)
    state = state.map(block => {
        block = inverseShiftRows(block); // Inverse ShiftRows
        block = inverseSubBytes(block); // Inverse SubBytes
        return addRoundKey(block, roundKeys[0]); // AddRoundKey inicial
    });

    // state = removePadding
    return convertToText(state);
};

export function hexadecimalTextToDecimal4x4(text: string): number[][][] {
    //Cada byte representa 2 caracteres hexadecimales
    if (text.length % 32 !== 0) {
        text = padHex(text);
    };
    const hexPairs = text.match(/.{1,2}/g); //Divide el texto en pares de caracteres
    if (!hexPairs) throw new Error("El texto hexadecimal está vacío o es inválido.");

    //Convertir pares hexadecimales en números decimales
    const decimalArray = hexPairs.map((hex) => parseInt(hex, 16));
    // Paso 4: Dividir en bloques de 16 bytes
    const blocks = [];
    for (let i = 0; i < decimalArray.length; i += 16) {
        blocks.push(decimalArray.slice(i, i + 16));
    }

    // Paso 5: Convertir cada bloque en una matriz 4x4
    return blocks.map((block) => {
        const matrix = [];
        for (let row = 0; row < 4; row++) {
            matrix.push(block.slice(row * 4, row * 4 + 4));
        }
        return matrix;
    });
};

const padHex = (hexString: string): string => {
    const paddingLength = 32 - (hexString.length % 32);
    return hexString + "0".repeat(paddingLength);
};

function convertToText(state: number[][][]): string {
    return state
        .map(block =>
            block
                .map(row =>
                    row
                        .map(value =>
                            value >= 32 && value <= 126 ? String.fromCharCode(value) : '' // Solo caracteres imprimibles
                        )
                        .join('')
                )
                .join('')
        )
        .join('');
}
