export const handleInputChange = (formData: any, setFormData: (arg0: any) => void) => (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};
export const handleInputChangeNumber = (formData: any, setFormData: (arg0: any) => void) => (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;

    const sanitizedValue = Math.max(Number(value), 1);

    setFormData({
        ...formData,
        [name]: sanitizedValue.toString(),
    });
};