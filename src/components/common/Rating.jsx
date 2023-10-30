const Rating = ({ value }) => {
  const integerPart = Math.floor(value);
  const decimalPart = value - integerPart;

  const renderStars = (count) => {
    const stars = [];
    for (let i = 1; i <= count; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-500 fill-current"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 1.551l2.928 5.674 6.235.904-4.511 4.387 1.064 6.203-5.716-3.008-5.715 3.008 1.065-6.203L.837 8.129l6.235-.904L10 1.55z"
          />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="flex items-center">
      {renderStars(integerPart)}
      {decimalPart > 0 && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-yellow-500 fill-current"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 1.551l2.928 5.674 6.235.904-4.511 4.387 1.064 6.203-5.716-3.008-5.715 3.008 1.065-6.203L.837 8.129l6.235-.904L10 1.55z"
          />
        </svg>
      )}
    </div>
  );
};

export default Rating;
