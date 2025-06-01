// StepThree.tsx
export default function StepThree({ data }: { data: { name: string; email: string; street: string; city: string; zip: string; } }) {
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Step 3: Review & Confirm</h2>
        <div className="text-sm">
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Street:</strong> {data.street}</p>
          <p><strong>City:</strong> {data.city}</p>
          <p><strong>Zip:</strong> {data.zip}</p>
        </div>
      </div>
    );
  }
  