import { render, screen } from '@testing-library/react';
import AboutPage from '../../pages/AboutPage';

describe('AboutPage', () => {
  test('renders AboutPage with Header, About, and Footer components', () => {
    render(
        <AboutPage />
    );
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText(/NewsTailor was developed as part of the Software Engineering Lab course/i)).toBeInTheDocument();
    expect(screen.getByTitle('React')).toBeInTheDocument();
    expect(screen.getByTitle('Django')).toBeInTheDocument();
    expect(screen.getByTitle('TypeScript')).toBeInTheDocument();
  });
});
