interface IConfig {
  method?: string;
  headers?: {};
  body?: any;
}

export async function callApi(url:string, config: IConfig): Promise<any> {
  const apiUrl = `/api/${url}`
  try {
    /**
     * Fetch the data from the API
     */
    const response = await fetch(apiUrl, config);

    const data = response;
    

    /**
     * Return the data
     */
    return data;
  } catch (error) {
    console.error(error);
    return;
  }
}
