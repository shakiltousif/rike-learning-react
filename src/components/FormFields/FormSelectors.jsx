
export default function FormSelectors({ Id, extraClasses, labelText, selectedValue, selectLoading, firstOptionLabel, children, ...rest }) {
    return (
        <div>
            <label htmlFor={Id} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labelText}</label>

            <select name={Id} id={Id} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${extraClasses}`} disabled={selectLoading} value={selectedValue} {...rest}>
                <option hidden>{selectLoading ? 'Loading...' : firstOptionLabel}</option>
                {children}
            </select>
        </div>
    )
}