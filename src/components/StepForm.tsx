// app/dashboard/add/components/StepForm.tsx
'use client';

import { useState, useEffect } from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import FormNav from './FormNav';
import { AnimatePresence, motion } from 'framer-motion';
import { z } from 'zod';
import { toast } from 'sonner';

type FormData = {
  name: string;
  email: string;
  street: string;
  city: string;
  zip: string;
};

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  street: z.string().min(1, 'Street is required'),
  city: z.string().min(1, 'City is required'),
  zip: z.string().min(1, 'Zip is required'),
});

const initialData: FormData = {
  name: '',
  email: '',
  street: '',
  city: '',
  zip: '',
};

export default function StepForm() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('userForm');
      return saved ? JSON.parse(saved) : initialData;
    }
    return initialData;
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('userForm', JSON.stringify(formData));
  }, [formData]);

  const goNext = () => {
    const currentStepFields = step === 0 ? ['name', 'email'] : ['street', 'city', 'zip'];
    const result = formSchema.pick(Object.fromEntries(currentStepFields.map(f => [f, true])) as any).safeParse(formData);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach(e => { fieldErrors[e.path[0]] = e.message; });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setStep((prev) => Math.min(prev + 1, 2));
  };
  const goBack = () => setStep((prev) => Math.max(prev - 1, 0));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = () => {
    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach(e => { fieldErrors[e.path[0]] = e.message; });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    toast.success('User added!');
    console.log('✅ Form submitted:', formData);
    localStorage.removeItem('userForm');
    window.dispatchEvent(new Event('user-added'));
  };

  const stepComponents = [
    <StepOne data={formData} onChange={handleChange} errors={errors} key={0} />,
    <StepTwo data={formData} onChange={handleChange} errors={errors} key={1} />,
    <StepThree data={formData} key={2} />,
  ];

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3, type: 'spring' }}
        >
          {stepComponents[step]}
        </motion.div>
      </AnimatePresence>
      <FormNav
        step={step}
        onNext={goNext}
        onBack={goBack}
        onSubmit={handleSubmit}
        formData={formData}
        errors={errors}
      />
    </div>
  );
}
