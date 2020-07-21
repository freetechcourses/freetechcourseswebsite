const deleteModal = (id, name, URL, redirectUrl, modalId) => {
  console.log(id);
  const modal = ` <div id=${modalId} class="modal fade">
      <div class="modal-dialog modal-confirm2">
        <div class="modal-content">
          <button
            type="button"
            class="close close-btn"
            data-dismiss="modal"
            aria-hidden="true"
          >
            &times;
          </button>
          <div class="col-12 text-center">
            <img
              src="./assets/img/question.png"
              alt="question-mark"
              id="question"
            />
          </div>
          <div class="modal-header flex-column">
            <h4 class="modal-title w-100 col-12 text-center">
              Are you sure you want to
              <span class="text-danger">DELETE</span> this ${name}?
            </h4>
          </div>
          <div class="modal-footer justify-content-center">
            <button type="button" class="btn btn-success" data-dismiss="modal">
              Nope
            </button>
            <button
              type="button"
              class="btn btn-danger"
              id=${id}
              data-dismiss="modal"
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>`;
  $('body').append(modal);

  deleteRequest(id, URL, redirectUrl);
};
