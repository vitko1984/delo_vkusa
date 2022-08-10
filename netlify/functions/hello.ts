const handler = async () => {
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Good morning!' }),
  };
}; 

export { handler };