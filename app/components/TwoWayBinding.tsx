export const handleInputChange = (formData: any, setFormData: (arg0: any) => void) => (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};
