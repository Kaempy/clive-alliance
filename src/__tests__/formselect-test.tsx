import FormSelect from '@/components/ui/FormSelect';
import React, { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { fireEvent, render, screen } from '@/test-utils';

type FormValues = { choice: string | null };

const Wrapper = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const methods = useForm<FormValues>({
    defaultValues: { choice: null },
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('FormSelect', () => {
  test('renders label, optional tag, and placeholder', (): void => {
    render(
      <Wrapper>
        <FormSelect
          name="choice"
          label="Select Item"
          isOptional
          options={[
            { label: 'One', value: 'one' },
            { label: 'Two', value: 'two' },
          ]}
          placeholder="Pick one"
        />
      </Wrapper>,
    );

    expect(screen.getByText(/select item/i)).toBeOnTheScreen();
    expect(screen.getByText(/optional/i)).toBeOnTheScreen();
    expect(screen.getByText(/pick one/i)).toBeOnTheScreen();
  });

  test('selects an option and updates form value', (): void => {
    render(
      <Wrapper>
        <FormSelect
          name="choice"
          label="Select Item"
          options={[
            { label: 'One', value: 'one' },
            { label: 'Two', value: 'two' },
          ]}
        />
      </Wrapper>,
    );

    fireEvent.press(screen.getByText(/two/i));

    expect(screen.getByTestId('selected-value')).toHaveTextContent('two');
  });
});
