# CLI

### Development
```js
npm i // in case you don't have node_modules installed
npm start
```

Go to http://localhost:4200/

### Production 
```js
npm run build
```

In the `dist` folder will be the app built artifacts.

### Local preview build artifacts
```js
npm run preview
```

Go to http://localhost:4200/

### Testing
```js
npm run test
```

<hr />

# Architecture

### Domain models

Each entity in the system should have a domain model. This model should be:
  - named as in-project convention (shouldn't be used any synonyms);
  - structured and initialized as is (no field names or values overrides);
  - should not use any library to make it technology agnostic.

![](/readme/abstract-architecture.png)

###### Model sample

```ts
// base-model.ts
export abstract class BaseModel<T> {
  constructor(data: T) {
    this.update(data);
  }
  
  abstract get asJson(): T;

  update(newData: Partial<T>): T {
    const allData = { ...this.asJson, ...newData };
    
    Object.assign(this, allData);
    
    return this.asJson;
  }
}

// user/read-model.ts

export interface UserGetDTO {
  id: string;
  name: string;
}

export class UserGetModel extends BaseModel<UserGetDTO> {
  private id: string;
  private name: string;

  constructor(data: UserGetDTO) {
    super();

    this.update(data);
  }

  get asJson(): UserGetDTO {
    return {
      id: this.id,
      name: this.name,
    };
  }
}
```

Having model as a class allows to add the various logic:
```ts
enum ProjectStatus {
  open = 'open',
  active = 'active',
  finished = 'finished'
}

export class ProjectGetModel extends BaseModel<ProjectGetDTO> {
  private id: string;
  private status: ProjectStatus;

  constructor(data: ProjectGetDTO) {
    super();

    this.update(data);
  }

  canAddPeople() {
    return [ProjectStatus.open, ProjectStatus.active].includes(this.status);
  }

  get asJson(): ProjectGetDTO {
    return {
      id: this.id,
      status: this.status,
    };
  }
}

// another file

const project = new ProjectGetModel(data);

project.canAddPeople(); // false
project.update({ status: someNewStatus });
project.canAddPeople(); // true
```

###### CQRS

Often there are CRUD operations with domain entities. To understand exactly which data should be passed to operation and which data will be received from operation, each operation should have model.

```ts
async get(id: string) {
  const { data } = await this.httpClient.get<UserGetDTO>(`/users/${id}`);

  return new UserGetMode(data);
}

update(user: UserUpdateDTO) {
  return this.httpClient.put(`/users/${id}`, user);
}

getList() {
  const { data } = await this.httpClient.get<UserListDTO>('/users');

  return data.map((x) => new UserListModel(x));
}
```

### MVVM

![](/readme/mvvm.png)

###### Model

  - Data access layer abstraction, could be used any technologies in Model: GraphQl, REST, Bluetooth, etc.
  - Model shouldn't know about View and View Model. 
  - In the application, Model is implemented through **Services**.
  - All **Services** should be injected in the Dependency injection container with Singleton pattern.
**Service** could be two types:
    1. domain object oriented: users service, hospitals service, etc;
    2. logic oriented: authentication service, storage service, logger service, config service.

Each domain oriented request in the **Service** which returns data should be wrapped with domain model:
```ts
class UsersService {
  async get(id: string) {
    const { data } = await this.httpClient.get<UserGetDTO>(`/users/${id}`);

    return new UserReadModel(data);
  }

  getList() {
    const { data } = await this.httpClient.get<UserListDTO>('/users');

    return data.map((x) => new UserListModel(x));
  }
} 
```

###### View Model

  - Layer between Model and View. 
  - View Model can be used per one View only. 
  - View Model should be View agnostic, there should not be any View specific logic, like handling the View events, or searching the element in elements tree. 
  - View Model could store data needed for View. On that data change in View Model, View should be rerendered. 
  - Data binding implemented with mobx with observable (for data) and observer (for View): 

```ts
import { appMakeAutoObservable, appObservable } from '@core/state-management/utils';

class UsersVM {
  private _users: Array<UsersListModel> = [];
  private usersService = appInject<IUsersService>(DI_TOKENS.usersService);

  constructor() {
    makeAutoObservable(this, {
      _users: observable,
    });
  }

  get users() {
    return this._users;
  }

  getList: IUsersService['getList'] = async (...args) => {
    this._users = await this.usersService.getList(...args);
  }
}
```

###### View

React component which has a reference to the View Model.

```tsx
const $vm = new UsersVM();

const Users: React.FC<UsersProps> = observer(() => {
  useEffect(() => {
    $vm.getList();
  }, []);

  const handleSearchTextChange = useCallback((e) => {
    $vm.getList({ search: e.target.value });
  }, [])

  return (
    <div>
      <Input onChange={handleSearchTextChange} />
      <Table 
        data={$vm.list}
      />
    </div>
  );
});
```

### Environment agnostic Build artifacts

The build artifacts should be environment agnostic so that no need to rebuild the application per each environment. All the keys, licenses, env dependent app logic should be pass with config. This config is filled during the CD.

There are two possible variants for config storing:
  - .env file - serverful hosted front-end application;
  - config.json file - serverless hosted front-end application.

Both sources are encapsulated in config service.

### Dependency injection

Each DI service should have an interface that describes its functionality so that this interface could be used for another service.

```ts
// shared/types/auth-service.ts

export interface IAuthService {
  login: (data: { username: string: password: string }) => Promise<{ 
    accessToken: string; 
    refreshToken: string;
  }>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

// the interface that describes injecting service always should be in the /shared/types folder 
// because we can use several services with that interface

// shared/services/auth.ts

@appInjectable()
export class AuthService implements IAuthService {
  login: IAuthService['login'] = (data) => { // type declaration is used to eliminate type declaration duplication
    // ...
  }

  logout = () => {
    // ...
  }

  refreshToken = () {
    // ...
  }
}

// shared/services/another-auth.ts

@appInjectable()
export class AnotherAuthService implements IAuthService {
  login: IAuthService['login'] = (data) => {
    // ...
  }

  logout = () => {
    // ...
  }

  refreshToken = () {
    // ...
  }
}

// In this way all the places where auth service is used we don't care about its realization 
// because any auth service implements interface.

export class LoginVM {
  private authService = appInject<IAuthService>(DI_TOKENS.authService);
}
```

### Logging 

Next action types in the system should be logged:
  - API requests;
  - User interaction (eg: user change his name, open page, etc);
  - React internals API (hooks).

All this logic is encapsulated within LoggerService. 
There are 4 Log levels: error, warning, info, debug. 
The Log level is configured in the global app configuration and can be changed without rebuilding the app.

For react should be used custom hooks in ui-hooks.ts

### Tests

In the application there are next test types:
  - unit;
  - integration.

Per each component which should be tested should be created a separate file in the same directory:

```ts
- components
  - button
    - button.tsx
    - button.styles.ts
    - button.test.tsx
    - index.tx
```

When creating an integration test, often there is a need to mock the Service (data access layer).
In this case:

```ts
- services
  - config
    - config.ts
    - config.mock.ts
```

Then during the test setup simply rebind the services with:

```ts
rebind(DI_TOKENS.configService, ConfigMockedService);
```

### Constants



### Caching

Caching is implemented with cache service. 
There is an ability to configure caching time without rebuilding the app with global app config.
Config service is integrated in Http client abstraction. 
To cache the request pass `{ cache: true }` to the request config.

### Http Client

To encapsulate all the http requests logic there is a http-client which has request, response interceptors.

### Library encapsulation

Every library which is used in the project should be encapsulated in one file(s) to simply migrate from one library to another across the project if it is needed. For example

Instead of:
```tsx
import { observer } from 'mobx';

const Page = observer(() => {
  return (
    <div>
      // ...
    </div>
  );
});
```

Do:
```tsx
import { observer } from '@core/state-management/utils';

const Page = observer(() => {
  return (
    <div>
      // ...
    </div>
  );
});
```

Library could be encapsulated in one of the next places:
  1. if there is a logic in the application with that library setup, like with state-management, or di, then in that directory encapsulate the library;
  2. if it is a simple library like lodash, retrieve the needed functions and place in the related folder, in most cases it is shared/utils/*;

### Development with stubs

There are cases when the UI started to develop a feature when the Back End is not ready. In this case all data related logic should be in service, so that when the API will be ready the only one place will be changed - service. The components, View models should not know that the current data is fake.

<hr />

# Conventions

  - should be used semantic layout instead of div everywhere (semantic HTML refers to syntax that makes the HTML more comprehensible by better defining the different sections and layout of web pages. It makes web pages more informative and adaptable, allowing browsers and search engines to better interpret content), header, button, label, p, h1, etc;
  - code should be debugging oriented - should be ability to set the breakpoint;
  - all files, folders should be written with small letters (to avoid problem with not case sensitive operating systems) and hyphen if needed;
  - not default exports to increase the project maintainability in terms of more explicit variable name. Except places where React Lazy loading needed (to decrease the code amount);
  - custom icons should have Icon postfix:
```tsx
export interface PhoneIconProps {}

export const PhoneIcon = () => {
  return ...
};
```
  - commit message: `<type>(<task-id>)<subject>`. eg: feat (zs-255) User registration. Integration
  - commit message, branch name: `<type>/<task-id>/<subject>`. eg: feat/zs-255/user-registration-integration
  feat (new feature for the user, not a new feature for build script);
  fix (bugfix, hotfix);
  refactor (rewriting the functionality);
  infra (infrastructure setup like build setup, state management);
  - no library, technologies specific names (files, variables, anything);
  - any component, page should have root class;
  - any error should be caught and after show a notification to user about this;

<hr />

# Main Toolkit

  - build tool: webpack
  - language: typescript
  - ui library: react
  - css preprocessor: JSS
  - ui components library: material-ui
  - state management: mobx, mobx-react
  - tests: jest, @testing-library
  - http: axios
  - di: inversify
  - forms: mobx-react-form
  - router: react-router
  - linting: eslint, prettier