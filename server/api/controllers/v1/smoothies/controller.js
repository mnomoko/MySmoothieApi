import l from '../../../../common/logger';
import SmoothiesService from '../../../services/postgres/smoothies.service';

export class Controller {
  all(req, res) {
    SmoothiesService.all()
      .then(r => res.json(r)).catch(err => l.error('error SmmothiesService.all()', err));
  }

  byId(req, res) {
    SmoothiesService
      .byId(req.params.id)
      .then(r => {
        if (r) res.json(r);
        else res.status(404).end();
      })
      .catch(err => res.status(500).json(err));
  }

  create(req, res) {
    SmoothiesService
      .create(req.body)
      .then(r => {
        if (r) res.json(r);
        else res.status(404).end();
      })
      .catch(err => res.status(500).json(err));
  }
}
export default new Controller();
