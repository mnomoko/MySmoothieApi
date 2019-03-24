import l from '../../../../common/logger';
import FruitsService from '../../../services/postgres/fruits.service';

export class Controller {
  all(req, res) {
    FruitsService.all()
      .then(r => res.json(r)).catch(err => l.error('error FruitsService.all()', err));
  }

  byId(req, res) {
    FruitsService
      .byId(req.params.id)
      .then(r => {
        if (r) res.json(r);
        else res.status(404).end();
      })
      .catch(err => l.error('error FruitsService.byId()', err));
  }

  create(req, res) {
    FruitsService
      .create(req.body.name)
      .then(r => res
        .status(201)
        .location(`<%= apiRoot %>/smoothie/${r.id}`)
        .json(r));
  }
}
export default new Controller();
