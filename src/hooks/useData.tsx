import { useEffect, useState } from 'react';

import { basename, InformationPlaceholder } from '@/constant';
import type { Information } from '@/types';

async function getData(): Promise<Information | null> {
  try {
    const res = await fetch(basename + 'information.json');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
  }
  return null;
}

export function useData() {
  const [info, setInfo] = useState<Information>(InformationPlaceholder);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      if (data) {
        setInfo(data);
      }
    };
    fetchData();
  }, []);

  return {
    info,
  };
}
