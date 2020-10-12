import React, { useEffect, useState } from 'react'
import axios from 'axios'
import moment from 'moment'
import { DatePicker, List, Typography } from 'antd'
import './Schedule.css'

const { Text, Paragraph } = Typography

const Schedule = () => {
    const dateFormat = 'YYYY-MM-DD'
    const dateFormatLong = 'MMMM D, YYYY'
    const [shows, setShows] = useState([])
    const [date, setDate] = useState(moment())
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        const api_url = `https://api.composer.nprstations.org/v1/widget/5187c93ce1c8256467c3b610/day?date=${date.format(dateFormat)}&format=json`

        setIsLoaded(false)

        axios.get(api_url)
            .then(response => {
                setShows(response.data.onToday)
                setIsLoaded(true)
            })
            .catch(error => {
                setIsLoaded(true)
                // TODO: handle errors
            })
    }, [date])

    return (
        <>
            <div className="Schedule">
                <DatePicker
                    defaultValue={date}
                    format={dateFormatLong}
                    allowClear={false}
                    onChange={(date, dateString) => { setDate(date) }}
                />

                <List
                    bordered
                    size="small"
                    itemLayout="horizontal"
                    loading={!isLoaded}
                    dataSource={shows}
                    renderItem={(show) => (
                        <List.Item
                            extra={
                                <Text mark strong>
                                    {moment(show.start_time, 'hh').format('LT')}
                                </Text>
                            }
                        >
                            <List.Item.Meta
                                title={
                                    <a
                                        href={show.program.program_link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {show.program.name}
                                    </a>
                                }
                                description={
                                    <Paragraph
                                        ellipsis={{
                                            rows: 1,
                                            expandable: true,
                                            symbol: 'more'
                                        }}
                                    >
                                        {show.program.program_desc}
                                    </Paragraph>
                                }
                            />
                        </List.Item>
                    )}
                />
            </div>
        </>
    )
}

export default Schedule
