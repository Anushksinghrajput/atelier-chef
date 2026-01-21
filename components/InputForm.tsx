
import React from 'react';
import { UserInputs } from '../types';

interface InputFormProps {
  onSubmit: (inputs: UserInputs) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  // Fix: Initialized all properties required by the UserInputs interface to resolve property-missing errors.
  const [inputs, setInputs] = React.useState<UserInputs>({
    planningDuration: '3',
    totalBudget: '50',
    budgetPriority: 'Balanced',
    dietaryRestrictions: '',
    ingredients: '',
    mealsPerDay: '3',
    cookingTimePerDay: '30',
    kitchenEquipment: 'medium',
    leftoversPreference: 'Plan for them'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInputs(prev => ({
      ...prev,
      // Fix: Value is handled as string to match UserInputs definition.
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputs.ingredients.split(',').length < 1) {
      alert("Please enter some ingredients.");
      return;
    }
    onSubmit(inputs);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6 border border-slate-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          {/* Fix: Changed property name from dietType to dietaryRestrictions to align with UserInputs interface. */}
          <label className="block text-sm font-semibold text-slate-700">Diet Type</label>
          <input
            type="text"
            name="dietaryRestrictions"
            placeholder="e.g. Vegan, Keto, No Gluten"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
            value={inputs.dietaryRestrictions}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          {/* Fix: Changed property name from cookingTime to cookingTimePerDay to align with UserInputs interface. */}
          <label className="block text-sm font-semibold text-slate-700">Cooking Time (mins)</label>
          <input
            type="number"
            name="cookingTimePerDay"
            min="5"
            max="180"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition"
            value={inputs.cookingTimePerDay}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          {/* Fix: Changed property name from kitchenSetup to kitchenEquipment to align with UserInputs interface. */}
          <label className="block text-sm font-semibold text-slate-700">Kitchen Setup</label>
          <select
            name="kitchenEquipment"
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition appearance-none bg-white"
            value={inputs.kitchenEquipment}
            onChange={handleChange}
          >
            <option value="basic">Basic (Knife, Pan, Stove)</option>
            <option value="medium">Medium (Oven, Blender, etc.)</option>
            <option value="fully equipped">Fully Equipped (Air Fryer, Sous Vide, etc.)</option>
          </select>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="block text-sm font-semibold text-slate-700">Ingredients Available</label>
          <textarea
            name="ingredients"
            placeholder="e.g. Chicken, Spinach, Onion, Garlic, Pasta..."
            rows={3}
            className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition resize-none"
            value={inputs.ingredients}
            onChange={handleChange}
            required
          />
          <p className="text-xs text-slate-400 italic">Separate with commas for best results.</p>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 ${
          isLoading ? 'bg-orange-300 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600 shadow-orange-200'
        }`}
      >
        {isLoading ? (
          <>
            <i className="fa-solid fa-circle-notch animate-spin"></i>
            Generating your plan...
          </>
        ) : (
          <>
            <i className="fa-solid fa-utensils"></i>
            Create My Cooking To-Do List
          </>
        )}
      </button>
    </form>
  );
};

export default InputForm;
