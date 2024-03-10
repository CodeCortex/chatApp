const GenderCheckbox = ({ onChekboxChange, selectedGender }) => {
  return (
    <div className="flex">
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer ${selectedGender === "male" ? "selected" : ""
            } `}
        >
          <span className="label-text text-gray-300">Male</span>
          <input
            type="checkbox"
            defaultChecked
            className="checkbox"
            checked={selectedGender === "male"}
            onChange={() => onChekboxChange("male")}
          />
        </label>
      </div>
      <div className="form-control">
        <label
          className={`label gap-2 cursor-pointer  ${selectedGender === "female" ? "selected" : ""
            }`}
        >
          <span className="label-text text-gray-300">Female</span>
          <input
            type="checkbox"
            className="checkbox"
            checked={selectedGender === "female"}
            onChange={() => onChekboxChange("female")}
          />
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
