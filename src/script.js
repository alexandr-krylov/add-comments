document.getElementById('putComment').addEventListener('click', putComment);

getArticle();
getComments();

function getArticle() {
    let httpRequest;
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpRequest.onreadystatechange = function() {fillArticle(httpRequest);};
    httpRequest.open('POST', './getArticle.php', true);
    httpRequest.send(null);
}

function setComment() {

}

function getComments() {
    let httpRequest;
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpRequest.onreadystatechange = function() {fillComments(httpRequest);};
    httpRequest.open('POST', './getComments.php', true);
    httpRequest.send(null);
}

function fillArticle(httpRequest) {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            let content = JSON.parse(httpRequest.responseText);
            console.log(content);
            document.getElementById('article-title').innerText = content.title;
            document.getElementById('article-content').innerHTML = content.content;
        } else {
            alert('Filling article problem! Call me!');
        }
    }
}

function fillComments(httpRequest) {
    if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            let commentContainer = document.getElementById('comments-content');
            commentContainer.innerHTML = '';
            JSON.parse(httpRequest.responseText).forEach(function(item){
                insertComment(item.created_at, item.user_name, item.content);
            });
        } else {
            alert('Filling comments problem! Call me!');
        }
    }
}

function putComment() {
    let httpRequest;
    if (window.XMLHttpRequest) { // Mozilla, Safari, ...
        httpRequest = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    httpRequest.open('POST', './setComment.php', true);
    let data = {
        name: document.getElementById('inputName').value,
        email: document.getElementById('inputEmail').value,
        content: document.getElementById('textareaContent').value
    };

    const FD  = new FormData();

    for( name in data ) {
        FD.append( name, data[ name ] );
    }

    httpRequest.addEventListener( 'load', function( event ) {
        let httpResponse = JSON.parse(httpRequest.responseText);
        insertComment(httpResponse.created_at, httpResponse.user_name, httpResponse.content);
    } );

    httpRequest.addEventListener(' error', function( event ) {
        alert( 'Commenting problem. Call me!' );
    } );
    httpRequest.send( FD );
}

function insertComment(createdAt, name, content) {
    let commentContainer = document.getElementById('comments-content');
    let li = document.createElement('li');
    li.innerHTML = '<small class="fw-light">' + createdAt + ' ' + name + '</small>' + ' ' + content;
    commentContainer.prepend(li);
}