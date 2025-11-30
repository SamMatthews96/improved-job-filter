
script
    when content updates, run filter
    when config updated, run filter

    filter
        logic will vary slightly based on webpage,
        but in general:
            get container selector for jobs
            get selector for each job
            get the fields from each job
            parse into a common format
            hide jobs that meet the filter

