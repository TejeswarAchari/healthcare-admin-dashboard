import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StatusBadge } from '../StatusBadge';

describe('StatusBadge Component', () => {
  it('renders Active status with correct styling', () => {
    render(<StatusBadge status="Active" />);
    const badge = screen.getByText('Active');
    
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-green-50', 'text-green-700', 'ring-green-600/20');
  });

  it('renders Recovered status with correct styling', () => {
    render(<StatusBadge status="Recovered" />);
    const badge = screen.getByText('Recovered');
    
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-blue-50', 'text-blue-700', 'ring-blue-700/10');
  });

  it('renders Critical status with correct styling', () => {
    render(<StatusBadge status="Critical" />);
    const badge = screen.getByText('Critical');
    
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-red-50', 'text-red-700', 'ring-red-600/10');
  });

  it('has proper badge structure with correct classes', () => {
    render(<StatusBadge status="Active" />);
    const badge = screen.getByText('Active');
    
    expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-md');
    expect(badge).toHaveClass('px-2', 'py-1', 'text-xs', 'font-medium', 'ring-1', 'ring-inset');
  });

  it('supports dark mode classes', () => {
    render(<StatusBadge status="Active" />);
    const badge = screen.getByText('Active');
    
    expect(badge).toHaveClass('dark:bg-green-900/30', 'dark:text-green-400', 'dark:ring-green-400/20');
  });
});
