class ApiService
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async post<T>(endpoint: string, data: T): Promise<{[key: string]: any}> 
  {
    try
    {
      const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT_URL}${endpoint}`,
      {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(data),
      });
      if (!response.ok)
      {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error);
      }
      return await response.json();
    } catch (error)
    {
      console.error('Error posting data:', error);
      throw error;
    }
  }

}

export default new ApiService();
