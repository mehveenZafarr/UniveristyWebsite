const createFieldSet = ({ inputName, inputValue, inputPlaceHolder, handleInputChange }) => {
    return (
        <fieldset className='border border-gray-300 px-4 rounded-lg mb-2'>
            <legend className='text-sm font-medium text-white'>{inputName.toUpperCase()}</legend>
            <input onChange={(e) => handleInputChange(e)} type="text" name={inputName} value={inputValue} placeholder={inputPlaceHolder} />
        </fieldset>
    );
}

export default createFieldSet;