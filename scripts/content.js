function removeAIByUrl() {
    const RMV_AI_TAG = '-ai';
    const EN_AI_TAG = '-useai';
    const SKIP_KEY = 'ai-skip'

    const origin = "https://www.google.com"
    const pageUrl = new URL(window.location.href);

    if (!pageUrl.origin.includes(origin)) return;
    
    /* Conteiner pesquisado */
    const containerAI = document.querySelector('div.mZJni, [data-g-id="ai-overview"], blockquote'); 

    if (!containerAI) {
        console.log("A IA do Google não está ativa nesta pesquisa.");
        return;
    }

    let reload = false;
    for (const [key, value] of pageUrl.searchParams) {
        if (key == 'q'){
            if (localStorage.getItem(SKIP_KEY) == pageUrl.searchParams.get('q')) {
                localStorage.removeItem(SKIP_KEY);
                break;
            }

            if (value.includes(EN_AI_TAG)) {
                pageUrl.searchParams.set(
                    'q',
                    `${pageUrl.searchParams.get('q').replace(RMV_AI_TAG, '').replace(EN_AI_TAG, '')}`
                );
                reload = true;
                localStorage.setItem(SKIP_KEY, pageUrl.searchParams.get('q'));
                break;
            }

            if (!value.includes(RMV_AI_TAG)) {
                pageUrl.searchParams.set('q', `${pageUrl.searchParams.get('q')} ${RMV_AI_TAG}`);
                reload = true;
            } else {
                console.log('Já possui proteção contra IA.')
            }
            break;
        }
    }

    if (reload) {
        const newPageUrl = pageUrl;
        window.location.href = newPageUrl.href;
    }
    
    // for (const [key, value] of pageUrl.searchParams) {
    //     console.log(`${key} => ${value}`);
    // }
}

function removeAIByDiv() {
    /* Conteiner pesquidado */
    const containerAI = document.querySelector('div.mZJni, [data-g-id="ai-overview"], blockquote');
    const parentAI = document.querySelector("div.bzXtMb, div.M8OgIe, div.dRpWwb");

    if (containerAI) {
        containerAI.style.display = 'none';
    }

    if (parentAI) {
        parentAI.style.display = 'none';
    }
}

// removeAIByUrl();
removeAIByDiv();