import { UserSignUp } from "../../types";

type GenderCheckboxProps = {
    handleChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void
    input: UserSignUp['gender'];
}


export default function GenderCheckbox({ handleChange, input }: GenderCheckboxProps) {
    return (
        <div className='flex'>
            <div className='form-control'>
                <label className='label gap-2 cursor-pointer'>
                    <span className='label-text'>Male</span>
                    <input type="checkbox" className='checkbox border-slate-900'
                        name="gender"
                        checked={input === "male"}
                        value={"male"}
                        onChange={handleChange} />
                </label>
            </div>
            <div className='form-control'>
                <label className='label gap-2 cursor-pointer'>
                    <span className='label-text'>Female</span>
                    <input type="checkbox" className='checkbox border-slate-900'
                        name="gender"
                        checked={input === "female"}
                        value={"female"}
                        onChange={handleChange} />
                </label>
            </div>
        </div>
    )
}
