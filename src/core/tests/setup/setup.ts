import '@testing-library/jest-dom/extend-expect';

import '@core/di/dependencies';
import { initializeStateManagement } from '@core/state-management/setup';

initializeStateManagement();
