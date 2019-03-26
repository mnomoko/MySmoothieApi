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
      .catch(err => l.error('error SmmothiesService.byId()', err));
  }

  create(req, res) {
    SmoothiesService
      .create(req.body.smoothie)
      .then(r => res
        .status(201)
        .location(`<%= apiRoot %>/smoothie/${r.id}`)
        .json(r));
  }
}
export default new Controller();
