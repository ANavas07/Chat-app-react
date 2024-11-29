export default class KeyManager {
    private static instance: KeyManager;
    private key: number[][][];

    private constructor() {
        this.key = [];
    }

    //Singleton para una instancia de KeyManager
    public static getInstance():KeyManager{
        if(!KeyManager.instance){
            KeyManager.instance = new KeyManager();
        }
        return KeyManager.instance;
    };

    //Setear clave
    public setKey(key: number[][][]):void{
        this.key = key;
    };
    
    //Obtener clave
    public getKey():number[][][]{
        return this.key;
    };  
}