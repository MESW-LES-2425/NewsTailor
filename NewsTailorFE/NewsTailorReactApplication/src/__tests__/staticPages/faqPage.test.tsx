import { render, screen } from '@testing-library/react';
import FaqPage from '../../pages/FaqPage';

describe('AboutPage', () => {
  test('renders AboutPage with Header, About, and Footer components', () => {
    render(
        <FaqPage />
    );
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByText(/What is NewsTailor/i)).toBeInTheDocument();
    expect(screen.getByText(/How does NewsTailor/i)).toBeInTheDocument();
    expect(screen.getByText(/Can I choose specific/i)).toBeInTheDocument();
    expect(screen.getByText(/How often is/i)).toBeInTheDocument();
  });
});
