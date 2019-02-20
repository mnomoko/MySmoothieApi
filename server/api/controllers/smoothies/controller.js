import SmoothiesService from '../../services/smoothies.service';

export class Controller {
  all(req, res) {
    SmoothiesService.all()
      .then(r => res.json(r)).catch(err => console.log('error SmmothiesService.all()', err));
  }

  byId(req, res) {
    SmoothiesService
      .byId(req.params.id)
      .then(r => {
        if (r) res.json(r);
        else res.status(404).end();
      })
      .catch(err => console.log('error SmmothiesService.byId()', err));
  }

  create(req, res) {
    SmoothiesService
      .create(req.body.name)
      .then(r => res
        .status(201)
        .location(`<%= apiRoot %>/smoothie/${r.id}`)
        .json(r));
  }
}
export default new Controller();
