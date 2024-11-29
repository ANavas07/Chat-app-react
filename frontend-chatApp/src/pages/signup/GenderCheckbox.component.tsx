import { UserSignUp } from "../../types";

type GenderCheckboxProps = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
    input: UserSignUp['gender'];
};

export default function GenderCheckbox({ handleChange, input }: GenderCheckboxProps) {
    return (
        <div className='flex items-center gap-6'> {/* Espaciado horizontal entre los checkboxes */}
            <div className='form-control'>
                <label className='label cursor-pointer flex items-center gap-2'>
                    <input 
                        type="checkbox" 
                        className='checkbox border-2 border-white focus:ring-2 focus:ring-blue-500'
                        name="gender"
                        checked={input === "male"}
                        value="male"
                        onChange={handleChange} 
                    />
                    <span className='label-text text-sm font-medium text-white'>Male</span>
                </label>
            </div>
            <div className='form-control'>
                <label className='label cursor-pointer flex items-center gap-2'>
                    <input 
                        type="checkbox" 
                        className='checkbox border-2 border-white focus:ring-2 focus:ring-blue-500'
                        name="gender"
                        checked={input === "female"}
                        value="female"
                        onChange={handleChange} 
                    />
                    <span className='label-text text-sm font-medium text-white'>Female</span>
                </label>
            </div>
        </div>
    );
}
