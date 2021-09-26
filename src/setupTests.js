import '@testing-library/jest-dom';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-17-updated';

Enzyme.configure({ adapter: new Adapter() }); 
