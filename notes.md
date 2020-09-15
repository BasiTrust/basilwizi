
export const comments_data = [
  (req, res, next) => {
    findById(req.params.id, function(err, postDetail){
      if(err){return next(err);}
      else {
        find({'postId': req.params.id}, function (err, comments) {
          if (err) { return next(err)}
          res.render('itm/news',
            {
              postDetail: postDetail,
              comments: comments,
              postId: req.params.id
            }
          );
        });
      }
    });
  }
];
//-.d-flex.flex-column.flex-md-row.align-items-center.p-3.px-md-4.mb-3.bg-dark.border-bottom.box-shadow
            h5.my-0.mr-md-auto.font-weight-normal.text-light Basilwizi Trust
            nav.my-2.my-md-0.mr-md-3
              a.p-2.text-light(href="/") Home 
              if !user
                a.p-2.text-light(href="/subscribe/login") Login
              .w3-dropdown-hover.w3-hide-small
                button.btn.btn-primary.bg-dark(title='Management and staff')
                  | Trust
                  i.fa.fa-caret-down
                .w3-dropdown-content.w3-card-4.w3-bar-block
                  a.w3-bar-item.w3-button(href='/subscribe/') Management
                  a.w3-bar-item.w3-button(href='/subscribe/') Board
                  a.w3-bar-item.w3-button(href='/subscribe/') Advisory Council
              .w3-dropdown-hover.w3-hide-small
                button.btn.btn-primary.bg-dark(title='admin tools')
                  | Admin Tools
                  i.fa.fa-caret-down
                .w3-dropdown-content.w3-card-4.w3-bar-block
                  a.w3-bar-item.w3-button(href='/subscribe/reports') Reports
                  a.w3-bar-item.w3-button(href='/subscribe/commentarys') Comments
                  a.w3-bar-item.w3-button(href='/subscribe/contactus') Messages
                  a.w3-bar-item.w3-button(href='/subscribe/articles') Articles
                  a.w3-bar-item.w3-button(href='/subscribe/emails') Emails
                  .w3-dropdown-hover.w3-hide-small
                    button.btn.btn-primary.bg-lighy(title='songs')
                      | Songs >
                      i.fa.fa-caret-down 
                      .w3-dropdown-content.w3-card-4.w3-bar-block
                        a.w3-bar-item.w3-button(href='/subscribe/song/create') Upload Songs
                        a.w3-bar-item.w3-button(href='/subscribe/songs') All songs
              
              .w3-dropdown-hover.w3-hide-small
                button.btn.btn-primary.bg-dark(title='projects and programmes')
                  | Projects
                  i.fa.fa-caret-down
                .w3-dropdown-content.w3-card-4.w3-bar-block
                  a.w3-bar-item.w3-button(href='/subscribe/') Water and sanitation
                  a.w3-bar-item.w3-button(href='/subscribe/') Teacher training
                  a.w3-bar-item.w3-button(href='/subscribe/') Livelihood
                  a.w3-bar-item.w3-button(href='/subscribe/') Child care
                  a.w3-bar-item.w3-button(href='/subscribe/') Culture preservation
              a.p-2.text-light(href="/subscribe/user") Profile
              if user 
                a.btn.btn-outline-primary.bg-light(href="/subscribe/logout") Logout
              if !user
                a.btn.btn-outline-primary.bg-light(href="/subscribe/signup") Register
              //-li
                label.toggle(for="drop-2") Administrator 
                  span.fa.fa-angle-down(aria-hidden="true")
                a(href="#") Administrator
                  span.fa.fa-angle-down(aria-hidden="true")
                input#drop-2(type="checkbox")
                ul
                  li
                    a.drop-text(href="#") Administor
                  li
                    a.drop-text(href="#") Report and Comments
                  li
                    a.drop-text(href="/subscribe/create/music") Media Upload
      

      
form(action="", method="post")
              .input-group-mb-3
                table
                  tr
                    .w3-section
                      label Title of article
                      input.form-control(type="text", name="", required)
              .input-group-mb-3
                table
                  thead
                    tr
                      th
                        .w3-section
                          label Name
                          input.form-control(type="text", name="", required)
                      th
                        .w3-section
                          label Surname
                          input.form-control(type="text", name="", required)
                      th
                        .w3-section
                          label Email
                          input.form-control(type="email", name="", required)
                      th
                        .w3-section
                          label Date of Publication
                          input.form-control(type="date", name="", required)
              .input-group-mb-3
                table
                  thead
                    tr
                      
                      .w3-section
                        textarea.textarea.form-control(name="textarea",  rows="20", required)
              .input-group-mb-3
                table
                  thead
                    tr
                      td
                        .w3-section
                          button.btn.btn-success(type="button", value="publish article") publish article

                          
          .w3-container.w3-card-4.w3-padding-16.w3-white
            form(action="", method="post")
              .w3-section
                label Name
                  input.form-control(type="text", name="first_name", required)
              
              .w3-section
                label Surname
                  input.form-control(type="text", name="last_name", required)
              
              .w3-section
                label Email
                  input.form-control(type="email", name="user_email", required)
              
              .w3-section
                label Date of Publishing
                  input.form-control(type="date", name="pub_date", required)

              .w3-section
                label Article title
                input.form-control(type="text", name="article_title", required)
              .w3-section.w3-container.w3-card-4.w3-padding-16.w3-white
                label Article Body
                textarea.textarea.form-control(type="text", rows="12" name="title_content", required)
              .w3-section
                button.btn.btn-success(type="submit") Publish Article
                .container
    .row.w3-row-padding.w3-padding-16.w3-justify.w3-theme-l1
      .col-sm-8 
        h3 Main News
        #news.w3-row-padding.w3-justify.w3-padding-16
          .w3-third.w3-margin-bottom
            ul.w3-ul.w3-border.w3-hover-shadow
              article.w3-card.w3-container.w3-white
                h1 Binga opens up
                p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                |
                a.w3-hover-white(href='http://' onclick="document.getElementById('fullStory').style.display='block'" title='read full story') full story>>
                #fullStory.w3-modal
                  .w3-modal-content.w3-card-2.w3-animate-top
                    header.w3-container.w3-teal.w3-display-container
                      span.w3-button.w3-teal.w3-display-topright(onclick="document.getElementById('fullStory').style.display='none'")
                        i.fa.fa-remove close
                      h4 Binga Opens Up..
                      h5
                        | Because we can 
                        i.fa.fa-smile-o
                    .w3-container
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                    footer.w3-container.w3-teal
                      p Basilwizi | Copyright-2019 |

          .w3-third.w3-margin-bottom
            ul.w3-ul.w3-border.w3-hover-shadow
              article.w3-card.w3-container.w3-white
                h1 Binga opens up
                p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                |
                a(href='http://') full story>>
          .w3-third.w3-margin-bottom
            ul.w3-ul.w3-border.w3-hover-shadow
              article.w3-card.w3-container.w3-white
                h1 Binga opens up
                p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                |
                a(href='http://') full story>>
          .w3-third.w3-margin-bottom
            ul.w3-ul.w3-border.w3-hover-shadow
              article.w3-card.w3-container.w3-white
                h1 Binga opens up
                p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                |
                a(href='http://') full story>>
          .w3-third.w3-margin-bottom
            ul.w3-ul.w3-border.w3-hover-shadow
              article.w3-card.w3-container.w3-white
                h1 Binga opens up
                p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                |
                a(href='http://') full story>>
          .w3-third.w3-margin-bottom
            ul.w3-ul.w3-border.w3-hover-shadow
              article.w3-card.w3-container.w3-white
                h1 Binga opens up
                p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                |
                a(href='http://') full story>>
      
      .col-sm-4
        h3 Music and Vids
        iframe(src="/media/videos/mov_bbb.mp4" frameborder="0", style='width: 340px; height: 230px;')
        //iframe(src="https://www.youtube.com/embed/ratdbWKBfks?autoplay=0" frameborder="0", style='width: 480px; height: 230px;')
        p
        audio(id='audioPlayer', controls)
          | Sorry your browser is not supported!
        ul(id='playlist')
          li
            a(class="current-song" href="/media/audio/Maseseke mumanza a Jesu.mp3") Muna binga
          li
            a(href="/media/audio/lullaby.mp3") Lullaby
          li
            a(href="/media/audio/Utalili mukwesu.mp3") Utalili mukwesu
          li
            a(href="/media/audio/Beethhoven.mp3") Beethhoven
    .row.w3-row-padding.w3-padding-small.w3-justify.w3-theme-d5
      .row
        .col-sm-12
          #news.w3-row-padding.w3-justify.w3-padding-16
            .w3-third.w3-margin-bottom
              ul.w3-ul.w3-border.w3-hover-shadow
                article.w3-card.w3-container.w3-white
                  h1 Binga opens up
                  p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                  |
                  a.w3-hover-white(href='http://' onclick="document.getElementById('fullStory').style.display='block'" title='read full story') full story>>
                  #fullStory.w3-modal
                    .w3-modal-content.w3-card-2.w3-animate-top
                      header.w3-container.w3-teal.w3-display-container
                        span.w3-button.w3-teal.w3-display-topright(onclick="document.getElementById('fullStory').style.display='none'")
                          i.fa.fa-remove close
                        h4 Binga Opens Up..
                        h5
                          | Because we can 
                          i.fa.fa-smile-o
                      .w3-container
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      footer.w3-container.w3-teal
                        p Basilwizi | Copyright-2019 |

            .w3-third.w3-margin-bottom
              ul.w3-ul.w3-border.w3-hover-shadow
                article.w3-card.w3-container.w3-white
                  h1 Binga opens up
                  p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                  |
                  a(href='http://') full story>>
            .w3-third.w3-margin-bottom
              ul.w3-ul.w3-border.w3-hover-shadow
                article.w3-card.w3-container.w3-white
                  h1 Binga opens up
                  p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                  |
                  a(href='http://') full story>>
            .w3-third.w3-margin-bottom
              ul.w3-ul.w3-border.w3-hover-shadow
                article.w3-card.w3-container.w3-white
                  h1 Binga opens up
                  p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                  |
                  a(href='http://') full story>>
            .w3-third.w3-margin-bottom
              ul.w3-ul.w3-border.w3-hover-shadow
                article.w3-card.w3-container.w3-white
                  h1 Binga opens up
                  p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                  |
                  a(href='http://') full story>>
            .w3-third.w3-margin-bottom
              ul.w3-ul.w3-border.w3-hover-shadow
                article.w3-card.w3-container.w3-white
                  h1 Binga opens up
                  p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                  |
                  a(href='http://') full story>>
  div
    p Many stories can be found in the 
      | 
      a(href="http://") archives
//  h1 #{article_it.my_artic_title}
  p #{article_it.family_name}
  p #{article_it.first_name}
  p #{article_it.user_email}
  p #{article_it.date_of_pub}
  
  div(style='margin-left:20px;margin-top:20px')
  if true
    p #{article_it.article_content}
 
  else
    p There are no articles to read.

  hr
  p
    a(href=article-title.url+'/delete') Delete article

    
                article.w3-card.w3-container.w3-white
                  a(href=article.url) #{article.my_artic_title} 
                  | by :
                  | #{article.first_name}
                  | date:
                  | #{article.date}
                  
        h3 Main News
        #news.w3-row-padding.w3-justify.w3-padding-16
          .w3-third.w3-margin-bottom
            ul.w3-ul.w3-border.w3-hover-shadow
              article.w3-card.w3-container.w3-white
                h1 Binga opens up
                p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                |
                a.w3-hover-white(href='http://' onclick="document.getElementById('fullStory').style.display='block'" title='read full story') full story>>
                #fullStory.w3-modal
                  .w3-modal-content.w3-card-2.w3-animate-top
                    header.w3-container.w3-teal.w3-display-container
                      span.w3-button.w3-teal.w3-display-topright(onclick="document.getElementById('fullStory').style.display='none'")
                        i.fa.fa-remove close
                      h4
                        a(href="/subscribe/articles/") #{my_artic_title}
                      h5
                        a(href="/subscribe/articles/") !{last_name} ,  !{first_name}
                        i.fa.fa-smile-o
                    .w3-container
                      h1
                        p !{article-content}
                      //-p #{article_it.article_content}
                    footer.w3-container.w3-teal
                      p Basilwizi | Copyright-2019 |
          .w3-third.w3-margin-bottom
            ul.w3-ul.w3-border.w3-hover-shadow
              article.w3-card.w3-container.w3-white
                h1 Binga opens up
                p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                |
                a(href='http://') full story>>
          .w3-third.w3-margin-bottom
            ul.w3-ul.w3-border.w3-hover-shadow
              article.w3-card.w3-container.w3-white
                h1 Binga opens up
                p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                |
                a(href='http://') full story>>
          .w3-third.w3-margin-bottom
            ul.w3-ul.w3-border.w3-hover-shadow
              article.w3-card.w3-container.w3-white
                h1 Binga opens up
                p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                |
                a(href='http://') full story>>
          .w3-third.w3-margin-bottom
            ul.w3-ul.w3-border.w3-hover-shadow
              article.w3-card.w3-container.w3-white
                h1 Binga opens up
                p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                |
                a(href='http://') full story>>
          .w3-third.w3-margin-bottom
            ul.w3-ul.w3-border.w3-hover-shadow
              article.w3-card.w3-container.w3-white
                h1 Binga opens up
                p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                |
                a(href='http://') full story>>
                .row.w3-row-padding.w3-padding-small.w3-justify.w3-theme-d5
      .row
        .col-sm-12
          #news.w3-row-padding.w3-justify.w3-padding-16
            .w3-third.w3-margin-bottom
              ul.w3-ul.w3-border.w3-hover-shadow
                article.w3-card.w3-container.w3-white
                  h1 Binga opens up
                  p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                  |
                  a.w3-hover-white(href='http://' onclick="document.getElementById('fullStory').style.display='block'" title='read full story') full story>>
                  #fullStory.w3-modal
                    .w3-modal-content.w3-card-2.w3-animate-top
                      header.w3-container.w3-teal.w3-display-container
                        span.w3-button.w3-teal.w3-display-topright(onclick="document.getElementById('fullStory').style.display='none'")
                          i.fa.fa-remove close
                        h4 Binga Opens Up..
                        h5
                          | Because we can 
                          i.fa.fa-smile-o
                      .w3-container
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                        p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                      footer.w3-container.w3-teal
                        p Basilwizi | Copyright-2019 |

            .w3-third.w3-margin-bottom
              ul.w3-ul.w3-border.w3-hover-shadow
                article.w3-card.w3-container.w3-white
                  h1 Binga opens up
                  p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                  |
                  a(href='http://') full story>>
            .w3-third.w3-margin-bottom
              ul.w3-ul.w3-border.w3-hover-shadow
                article.w3-card.w3-container.w3-white
                  h1 Binga opens up
                  p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                  |
                  a(href='http://') full story>>
            .w3-third.w3-margin-bottom
              ul.w3-ul.w3-border.w3-hover-shadow
                article.w3-card.w3-container.w3-white
                  h1 Binga opens up
                  p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                  |
                  a(href='http://') full story>>
            .w3-third.w3-margin-bottom
              ul.w3-ul.w3-border.w3-hover-shadow
                article.w3-card.w3-container.w3-white
                  h1 Binga opens up
                  p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                  |
                  a(href='http://') full story>>
            .w3-third.w3-margin-bottom
              ul.w3-ul.w3-border.w3-hover-shadow
                article.w3-card.w3-container.w3-white
                  h1 Binga opens up
                  p The Binga people habe opened up to a possible swap deal that will see them being accorded the chance to live in Zambia for the rest of their lives.
                  |
                  a(href='http://') full story>>
  div
    p Many stories can be found in the 
      | 
      a(href="http://") archives
      
  .
  div.container.bg-white
    h1 Topic
    p
      i To post a comment you need to be logged in.
    h4 Comment
    .media.border.p-3
      img.mr-3.mt-3.rounded-circle(src='/media/images/sv-img.jpg' alt='User' style='width:60px;')
      .media-body
        h4
          | Guest
          br
          small
            i Posted on !{Date()}
        p#para !{comments}
        p 
          | Thank you basilwizi for a job well done. Our district is now moving forward.
    h4 Comment
    .media.border.p-3
      img.mr-3.mt-3.rounded-circle(src='/media/images/sv-img.jpg' alt='User' style='width:60px;')
      .media-body
        h4
          | Guest
          br
          small
            i Posted on !{Date()}
        span#para
    p

    
  .container
    .row.w3-row-padding.w3-padding-16.w3-justify.w3-theme-l5.w3-card
      .col-sm-9
        each topic in !{commentarys}
          .media.border.p-3
            img.mr-3.mt-3.rounded-circle(src='/media/images/sv-img.jpg' alt='User' style='width:60px;')
            .media-body
              h4 !{comment-topic}
              |
              i Posted on !{date}
              p !{comment-content}
      .col-som-3
        each item in commentary_list
          li !{c-topic}

          
  // Validate fields.
  body('names').isLength({ min: 1 }).trim().withMessage('Lastname must be specified.')
  .isAlphanumeric().withMessage('Lastname has non-alphanumeric characters.'),
body('email').isLength({ min: 1 }).trim().withMessage('Email must be specified.')
.isEmail().withMessage('Must be an email.'),
  body('contactus_content', 'Title must not be empty.').isLength({ min: 1 }).trim(),
  
  // Sanitize fields (using wildcard).
  sanitizeBody('*').escape(),

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    ///////////////////////////////////////////////
    
const user_controller = require('../controllers/userController');
var email_controller = require('../controllers/emailController');
var article_controller = require('../controllers/articleController');
var commentary_controller = require('../controllers/commentaryController');
var song_controller = require('../controllers/songController');
const contactus_controller = require('../controllers/contactusController');


/* GET users listing.
router.get('/', function(req, res, next) {
  res.send('Redirect to the /subscribe/* to get going');
}); */

//// User Routes ////

// Register user get route 
router.get('/signup', user_controller.user_registration_get);
// Register user post route 
router.post('/signup', user_controller.user_registration_post);

// Login get route
router.get('/login', user_controller.user_login_get);
// Login get route with username
router.get('/login/:user_email', user_controller.user_login_get_useremail);
// Login post route
router.post(['/login','/login/:user_email'], user_controller.user_login_post);

/** 
 * Controllers for the lists and pages 
 * */

 /** LIST OF TONGA SONGS */
router.get('/songs', song_controller.song_list);

/** LIST OF ALL NEWS ARTICLES */
router.get('/articles', article_controller.article_list);

/** SUBSCRIBE TO BASILWIZI */
router.get('/email/create', email_controller.email_create_get);
router.post('/email/create', email_controller.email_create_post);
router.get('/email/:id', email_controller.email_detail);

/** COMMENTS */
router.get('/commentarys', commentary_controller.commentary_list);

/** CONTACT US */
router.get('/contactus/create', contactus_controller.contactus_create_get);
router.post('/contactus/create', contactus_controller.contactus_create_post);

/** STATIC PAGES */
/* GET users listing. */
router.get('/community', function(req, res, next) {
  res.render('community');
});

/* GET users listing. */
router.get('/about', function(req, res, next) {
  res.render('about');
});

/* GET users listing. */
router.get('/management', function(req, res, next) {
  res.render('management');
});

/* GET users listing. */
router.get('/reports', function(req, res, next) {
  res.render('reports');
});



exports.song_create_post = [ (req, res, next) => {
  const upload = multer({dest: '../media/audio/uploads', limits: { fields: 1, fileSize: 6000000, files: 1, parts: 2 }});
  upload.single('track')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: "Upload Request Validation Failed" });
    } else if(!req.body.name) {
      return res.status(400).json({ message: "No track name in request body" });
    }

  });
  var pathArray = req.body.name.split( '\\' );
  let trackName = pathArray[(pathArray.length - 1)];
  var song = new Song({
    trackName: trackName
  });
  Song.findOne({trackName})
    .exec(function(err, trackName){
      if(err){return next(err);}
      if(trackName){
        return res.render('/subscribe/songs/create', {title: 'Song Found', error: 'Song found in the database'});
      }
      else {
        song.save(function(err){
          if(err){return next(err);}

          res.redirect('/subscribe/songs');
        });
      }
    })
}];


// Display list of all audios.
exports.song_list = function(req, res, next) {
  Song.find()
  .sort([['trackName', 'ascending']])
  .exec(function (err, list_songs) {
    if (err) { return next(err); }
    //Successful, so render
    //res.render('song_list', { title: 'Songs ', song_list: list_songs });
    res.render('song_list', { title: 'Songs ', song_list: list_songs });
  }); 
};
