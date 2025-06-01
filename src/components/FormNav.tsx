// FormNav.tsx
export default function FormNav({
    step,
    onBack,
    onNext,
    onSubmit,
    formData,
    errors
  }: {
    step: number;
    onBack: () => void;
    onNext: () => void;
    onSubmit: () => void;
    formData: any;
    errors?: Partial<Record<string, string>>;
  }) {
    const isNextDisabled = () => {
      if (step === 0) return !formData.name || !formData.email;
      if (step === 1) return !formData.city || !formData.zip || !formData.street;
      return false;
    };
  
    return (
      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          disabled={step === 0}
          className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
        >
          Back
        </button>
  
        {step < 2 ? (
          <button
            onClick={onNext}
            disabled={isNextDisabled()}
            className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
          >
            Next
          </button>
        ) : (
          <button
            onClick={onSubmit}
            className="px-4 py-2 rounded bg-green-600 text-white"
          >
            Submit
          </button>
        )}
      </div>
    );
  }
  