json.array!(@books) do |book|
  json.extract! book, :title, :author, :released_on, :cover_image
  json.url book_url(book, format: :json)
end
