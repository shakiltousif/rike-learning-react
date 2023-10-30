import { useEffect, useState } from "react";

export default function InputRepeater({
  inputPlaceHolderText,
  inputExtraClasses,
  onChangeGetObj,
  defaultObj,
  idKey,
  valueKey,
  labelText,
  Id,
}) {
  const [repeaterObj, setRepeaterObj] = useState([
    {
      id: 0,
      name: "",
    },
  ]);

  const repeaterIdGenerator = (obj) => {
    const maxId = obj.reduce(
      (maxId, prevObj) => Math.max(prevObj.id, maxId),
      -1
    );
    return maxId + 1;
  };

  const addNewRepeater = (e) => {
    e.preventDefault();

    const Id = repeaterIdGenerator(repeaterObj);

    const newObj = {
      id: Id,
      name: "",
    };
    setRepeaterObj((prev) => [...prev, newObj]);
    // return the value to parent component
    onChangeGetObj([...repeaterObj, newObj]);
  };

  const removeRepeater = (id) => {
    const newRepeaterObj = repeaterObj.filter((item) => item?.id != id);

    setRepeaterObj(newRepeaterObj);

    // return the value to parent component
    onChangeGetObj(repeaterObj.filter((item) => item?.id != id));
  };

  const onChangeValue = (id, name) => {
    const indexToUpdate = repeaterObj.findIndex(
      (item) => parseInt(item?.id) === parseInt(id)
    );
    if (indexToUpdate !== -1) {
      repeaterObj[indexToUpdate] = {
        id,
        name,
      };

      setRepeaterObj(repeaterObj);
    }

    // return the value to parent component
    onChangeGetObj(repeaterObj);
  };

  useEffect(() => {
    const newArr = [];
    defaultObj?.map((item) => {
      newArr?.push({ id: item?.[`${idKey}`], name: item?.[`${valueKey}`] });
    });
    setRepeaterObj(newArr);
  }, [defaultObj, idKey, valueKey]);
  return (
    <div>
      <label
        htmlFor={Id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {labelText}
      </label>
      {repeaterObj?.map((item, key) => (
        <div key={key} className="flex items-center space-between my-6">
          <input
            type={"text"}
            name={`input_points_${item?.id}`}
            id={`input_points_${item?.id}`}
            className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${inputExtraClasses}`}
            placeholder={inputPlaceHolderText}
            defaultValue={item?.name}
            onChange={(e) => onChangeValue(item?.id, e.target.value)}
          />

          {key != 0 && (
            <div
              className="px-2 rounded-full cursor-pointer"
              onClick={() => removeRepeater(item?.id)}
            >
              <i className="fa fa-close"></i>
            </div>
          )}
        </div>
      ))}

      <div>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={addNewRepeater}
        >
          <span>Add New</span>
        </button>
      </div>
    </div>
  );
}
