import reactIcon from './assets/icons/tech/react.svg';
import javascriptIcon from './assets/icons/tech/javascript.svg';
import typescriptIcon from './assets/icons/tech/typescript.svg';
import pythonIcon from './assets/icons/tech/python.svg';
import djangoIcon from './assets/icons/tech/django.svg';
import djangoRestIcon from './assets/icons/tech/djangorest.svg';
import flaskIcon from './assets/icons/tech/flask.svg';
import fastapiIcon from './assets/icons/tech/fastapi.svg';
import postgresqlIcon from './assets/icons/tech/postgresql.svg';
import mongodbIcon from './assets/icons/tech/mongodb.svg';
import dockerIcon from './assets/icons/tech/docker.svg';
import gitIcon from './assets/icons/tech/git.svg';
import redisIcon from './assets/icons/tech/redis.svg';
import nextjsIcon from './assets/icons/tech/nextjs.svg';
import nodejsIcon from './assets/icons/tech/nodejs.svg';
import elasticsearchIcon from './assets/icons/tech/elasticsearch.svg';
import figmaIcon from './assets/icons/tech/figma.svg';
import ReactnativeIcon from './assets/icons/tech/reactnative.svg';
import FirebaseIcon from './assets/icons/tech/firebase.svg';
import OauthIcon from './assets/icons/tech/Oauth.svg';

export const techIcons = {
  'React': reactIcon,
  'JavaScript': javascriptIcon,
  'TypeScript': typescriptIcon,
  'Python': pythonIcon,
  'Django': djangoIcon,
  'Django REST': djangoRestIcon,
  'Flask': flaskIcon,
  'FastAPI': fastapiIcon,
  'PostgreSQL': postgresqlIcon,
  'MongoDB': mongodbIcon,
  'Docker': dockerIcon,
  'Git': gitIcon,
  'Redis': redisIcon,
  'NextJS': nextjsIcon,
  'Node.js': nodejsIcon,
  'Elasticsearch': elasticsearchIcon,
  'Figma': figmaIcon,
  'React Native': ReactnativeIcon,
  'Firebase': FirebaseIcon,
  'OAuth2': OauthIcon,
};

export const getTechIcon = (techName) => {
  return techIcons[techName] || null;
};

export const getImageUrl = (path) => {
    return `/assets/${path}`;
}