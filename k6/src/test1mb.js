import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '2s', target: 500 },
    { duration: '2s', target: 1000 },
    { duration: '2s', target: 1500 },
    { duration: '6s', target: 0 },
  ],
  thresholds: {
    http_req_duration: ['p(95)<2000'],
    http_req_failed: ['rate<0.0001'],
  },
};

export default function () {
  const res = http.get('http://0.0.0.0:5000/file/1mb');
  check(res, { "status for file 1mb is 200": (res) => res.status === 200 });
}
