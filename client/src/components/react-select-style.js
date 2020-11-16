export const customStyles = {
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? 'floralWhite' : 'blue',
    }),
    valueContainer: () => ({
      // none of react-select's styles are passed to <Control />
      backgroundColor: "floralWhite",
      borderRadius :  "5px",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';
  
      return { ...provided, opacity, transition };
    }
  }