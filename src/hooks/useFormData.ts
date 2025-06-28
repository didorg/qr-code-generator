import { useState } from 'react';
import { FormData, ContactInfo } from '../types/qr-types';

const initialContactInfo: ContactInfo = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  organization: '',
  url: '',
};

const initialFormData: FormData = {
  url: '',
  text: '',
  contact: initialContactInfo,
};

export const useFormData = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const updateUrl = (url: string) => {
    setFormData((prev) => ({ ...prev, url }));
  };

  const updateText = (text: string) => {
    setFormData((prev) => ({ ...prev, text }));
  };

  const updateContact = (contact: Partial<ContactInfo>) => {
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, ...contact },
    }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  return {
    formData,
    updateUrl,
    updateText,
    updateContact,
    resetForm,
  };
};
