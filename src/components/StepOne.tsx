// StepOne.tsx
export default function StepOne({
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
        <h2 className="text-xl font-semibold">Step 1: Basic Info</h2>
        <div>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={onChange}
            placeholder="Full Name"
            className="input"
            required
          />
          {errors?.name && <div className="text-red-500 text-xs mt-1">{errors.name}</div>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            value={data.email}
            onChange={onChange}
            placeholder="Email"
            className="input"
            required
          />
          {errors?.email && <div className="text-red-500 text-xs mt-1">{errors.email}</div>}
        </div>
      </div>
    );
  }
  