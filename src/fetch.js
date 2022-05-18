import { useState } from 'react';

export default function fetch(a) {
  const [data, setData] = useState(null);
  setData(a + 3);
  return data;
}
