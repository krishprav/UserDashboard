// StepTwo.tsx
export default function StepTwo({
    data,
    onChange,
    errors
  }: {
    data: {
      name: string;
      email: string;
      street: string;
      city: string;
      zip: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    errors?: Partial<Record<string, string>>;
  }) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Step 2: Address</h2>
        <div>
          <input
            type="text"
            name="street"
            value={data.street}
            onChange={onChange}
            placeholder="Street"
            className="input"
            required
          />
          {errors?.street && <div className="text-red-500 text-xs mt-1">{errors.street}</div>}
        </div>
        <div>
          <input
            type="text"
            name="city"
            value={data.city}
            onChange={onChange}
            placeholder="City"
            className="input"
            required
          />
          {errors?.city && <div className="text-red-500 text-xs mt-1">{errors.city}</div>}
        </div>
        <div>
          <input
            type="text"
            name="zip"
            value={data.zip}
            onChange={onChange}
            placeholder="Zip Code"
            className="input"
            required
          />
          {errors?.zip && <div className="text-red-500 text-xs mt-1">{errors.zip}</div>}
        </div>
      </div>
    );
  }
  