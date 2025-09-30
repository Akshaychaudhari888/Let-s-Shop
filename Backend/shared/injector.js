import _ from 'lodash';
import fs from 'fs';
import path from 'path';

const DEFAULT_NAMESPACE = '_root';
const items = {};

export default () => {
  if (!items[DEFAULT_NAMESPACE]) {
    items[DEFAULT_NAMESPACE] = {};
  }

  const injector = {
    register: (key, value) => {
      const trimmedKey = _.trim(key);
      items[DEFAULT_NAMESPACE][trimmedKey] = { value };
    },

    resolve: (key) => {
      const trimmedKey = _.trim(key);
      return items[DEFAULT_NAMESPACE][trimmedKey]?.value || {};
    },

    list: (ns = DEFAULT_NAMESPACE) => {
      if (!items[ns]) {
        return [];
      }
      return _.map(_.keys(items[ns]), key => ({
        key,
        value: items[ns][key].value
      }));
    },

    loadModules: (directory, namespace) => {
      const dirPath = path.resolve(directory);
      fs.readdirSync(dirPath).forEach(file => {
        if (file.endsWith('.js')) {
          const moduleName = path.basename(file, '.js');
          const modulePath = path.join(dirPath, file);
          const module = import(modulePath);
          injector.register(`${namespace}.${moduleName}`, module);
        }
      });
    }
  };

  injector.register('injector', injector);

  _.forEach(items, (val, key) => {
    if (key !== DEFAULT_NAMESPACE) {
      injector.register(key, val);
    }
  });

  return injector;
};
