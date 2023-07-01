declare module "react" {
  interface StyleHTMLAttributes<T> extends HTMLAttributes<T> {
    jsx?: any;
    global?: any;
  }
}

const GlobalStyles = () => {
  const globalStyles: any = `
*{
    font-family: 'Cairo', sans-serif!important;
} 

/* Hide scrollbar for Chrome, Safari and Opera */
.hideScrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.hideScrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

.map-container{
  width: 100%;
  height:100%;
  border-radius: 4px;
}
`;

  return (
    <style jsx="true" global="true">
      {globalStyles}
    </style>
  );
};

export default GlobalStyles;
