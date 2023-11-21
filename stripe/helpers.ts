export const postData = async ({
    url,
    data
  }: {
    url: string;
    data?: { price: 'price_1OCa1YL3S5nVxXEOQNXVKAuL' };
  }) => {
    console.log('posting,', url, data);
  
    const res = await fetch(url, {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      credentials: 'same-origin',
      body: JSON.stringify(data)
    });
  
    if (!res.ok) {
      console.log('Error in postData', { url, data, res });
  
      throw Error(res.statusText);
    }
  
    return res.json();
  };