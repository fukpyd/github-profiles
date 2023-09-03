export function showError(
  elements,
  error,
  hiddenClass = "hidden",
  invalidClass = "invalid"
) {
  const { wrapper, form, searchInput } = elements || {};
  !wrapper?.classList?.contains(hiddenClass) &&
    wrapper.classList.add(hiddenClass);
  !form?.classList?.contains(invalidClass) && form.classList.add(invalidClass);
  searchInput.value = "";
  searchInput.placeholder = error?.message;
}

export function clearError(elements, invalidClass = "invalid") {
  const { form, searchInput } = elements || {};
  form?.classList?.contains(invalidClass) &&
    form.classList.remove(invalidClass);
  searchInput.value = "";
  searchInput.placeholder = "Search Github user login...";
}

export function generateLink(link, defaultValue) {
  return link ? `<a href=${link} class="link">${link}</a>` : defaultValue;
}

export function showResult(
  data,
  elements,
  defaultValue = "Not available",
  unavailableDataClass = "unavailable",
  hiddenClass = "hidden"
) {
  const {
    login,
    name,
    createDate,
    bio,
    repos,
    followers,
    following,
    location,
    userTwitter,
    userBlog,
    userCompany,
    userAvatar,
    wrapper,
    searchInput,
  } = elements || {};

  if (!data?.login) {
    throw new Error("User not found, please try again...");
  }

  login.textContent = data?.login || defaultValue;
  name.textContent = data?.name || defaultValue;
  createDate.textContent = data?.created_at || defaultValue;

  if (data?.created_at) {
    const toConversionDate = new Date(createDate.textContent);
    const formattedEnrollDate = new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
    }).format(toConversionDate);
    createDate.textContent = `Joined at ${formattedEnrollDate}`;
  }

  bio.textContent = data?.bio || defaultValue;
  repos.textContent = data?.public_repos || defaultValue;
  followers.textContent = data?.followers || defaultValue;
  following.textContent = data?.following || defaultValue;
  location.textContent = data?.location || defaultValue;
  userAvatar.src = data?.avatar_url;

  // userTwitter.innerHTML = data?.twitter_username
  //   ? `<a href=${data.twitter_username} class="link">${data.twitter_username}</a>`
  //   : defaultValue;

  userTwitter.innerHTML = generateLink(data?.twitter_username, defaultValue);
  userBlog.innerHTML = generateLink(data?.blog, defaultValue);
  userCompany.innerHTML = generateLink(data?.company, defaultValue);

  const arr = [login, userCompany, userBlog, userTwitter, location];

  arr.forEach((el) => {
    if (el.textContent === defaultValue) {
      !el.classList.contains(unavailableDataClass) &&
        el.classList.add(unavailableDataClass);
    } else {
      el.classList.contains(unavailableDataClass) &&
        el.classList.remove(unavailableDataClass);
    }
  });
  console.log(wrapper);
  wrapper.classList.remove(hiddenClass);
  searchInput.value = "";
}
