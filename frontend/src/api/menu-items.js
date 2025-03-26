export const getAllMenuItems = async () => {
  try {
    const response = await fetch("http://localhost:8000/get-all-menu-items");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};
