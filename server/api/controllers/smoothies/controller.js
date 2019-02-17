import SmoothiesService from '../../services/smoothies.service';

export class Controller {
  all(req, res) {
    SmoothiesService.all()
      .then(r => res.json(r));
  }

  byId(req, res) {
    SmoothiesService
      .byId(req.params.id)
      .then(r => {
        if (r) res.json(r);
        else res.status(404).end();
      });
  }

  create(req, res) {
    SmoothiesService
      .create(req.body.name)
      .then(r => res
        .status(201)
        .location(`<%= apiRoot %>/examples/${r.id}`)
        .json(r));
  }
}
export default new Controller();
