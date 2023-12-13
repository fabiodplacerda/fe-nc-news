import { useState } from 'react';

const SortByForm = () => {
  const [sort, setSort] = useState('');

  const changeHandler = event => {
    console.log(event.target.value);
    setSort(event.target.value);
  };

  return <h2>Hello</h2>;
};

export default SortByForm;
