import api from "./baseApi"

export async function getAllFaqs() {
    return api.get('faqs', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
}

export async function makeLike(id) {
    return api.post(`faqs/${id}/like`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
}

export async function makeUnLike(id) {
    return api.post(`faqs/${id}/dislike`, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
}

export async function getTermsPolicy() {
    return api.get('settings?type=1', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
}