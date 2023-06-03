import React from "react";

type Props = {
  errors: string[];
};

const Errors: React.FC<Props> = ({ errors, ...props }) => {
  return (
    <>
      {errors.length > 0 && (
        <div {...props}>
          <div className="font-medium text-red-600">
            Whoops! Something went wrong.
          </div>

          <ul className="mt-3 list-disc list-inside text-sm text-red-600">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Errors;
