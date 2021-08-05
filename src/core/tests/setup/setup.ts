import '@testing-library/jest-dom/extend-expect';

import '@core/di/dependencies';
import { initializeDi } from './di';
import { initializeStateManagement } from '@core/state-management/setup';

initializeStateManagement();
initializeDi();