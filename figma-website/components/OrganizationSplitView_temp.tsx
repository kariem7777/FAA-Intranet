            {/* Section 5: Departmental KPIs */}
            {selectedNode.kpis && selectedNode.kpis.length > 0 && (
              <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <button
                  onClick={() => toggleSection('kpis')}
                  className="w-full flex items-center justify-between mb-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <Activity className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-900">Departmental Key Performance Indicators</h4>
                      <p className="text-xs text-gray-500">Performance metrics and targets</p>
                    </div>
                  </div>
                  {expandedSections.kpis ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>
                
                {expandedSections.kpis && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedNode.kpis.map((kpi) => (
                      <div key={kpi.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="text-sm text-gray-900">{kpi.title}</h5>
                          {kpi.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-600" />}
                          {kpi.trend === 'down' && <TrendingDown className="h-4 w-4 text-red-600" />}
                          {kpi.trend === 'stable' && <Minus className="h-4 w-4 text-gray-600" />}
                        </div>
                        <p className="text-xs text-gray-600 mb-3">{kpi.description}</p>
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-xs text-gray-500">Current</p>
                            <p className="text-lg text-gray-900">{kpi.metric}</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500">Target</p>
                            <p className="text-sm text-gray-700">{kpi.target}</p>
                          </div>
                        </div>
                        <Badge 
                          className="mt-2"
                          variant={kpi.status === 'exceeds' ? 'default' : kpi.status === 'meets' ? 'secondary' : 'outline'}
                        >
                          {kpi.status === 'exceeds' ? 'Exceeds Target' : kpi.status === 'meets' ? 'Meets Target' : 'Below Target'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )}

            {/* Section 6: Departmental Risks */}
            {selectedNode.risks && (
              <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <button
                  onClick={() => toggleSection('risks')}
                  className="w-full flex items-center justify-between mb-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-900">Departmental Risks</h4>
                      <p className="text-xs text-gray-500">Strategic and operational risks</p>
                    </div>
                  </div>
                  {expandedSections.risks ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>
                
                {expandedSections.risks && (
                  <div className="space-y-4">
                    {selectedNode.risks.strategic && selectedNode.risks.strategic.length > 0 && (
                      <div>
                        <h5 className="text-sm text-gray-900 mb-3">Strategic Risks</h5>
                        <div className="space-y-3">
                          {selectedNode.risks.strategic.map((risk) => (
                            <div key={risk.id} className="p-4 bg-red-50 rounded-lg border border-red-100">
                              <div className="flex items-start justify-between mb-2">
                                <p className="text-sm text-gray-900">{risk.title}</p>
                                <Badge 
                                  variant="outline"
                                  className={
                                    risk.level === 'High' ? 'bg-red-100 text-red-700 border-red-200' :
                                    risk.level === 'Medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                                    'bg-green-100 text-green-700 border-green-200'
                                  }
                                >
                                  {risk.level}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 mb-3">{risk.description}</p>
                              <div className="flex items-center gap-2 text-xs text-gray-700">
                                <User className="h-3 w-3" />
                                <span>{risk.mitigation} - {risk.mitigationRole}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedNode.risks.operational && selectedNode.risks.operational.length > 0 && (
                      <div>
                        <h5 className="text-sm text-gray-900 mb-3">Operational Risks</h5>
                        <div className="space-y-3">
                          {selectedNode.risks.operational.map((risk) => (
                            <div key={risk.id} className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                              <div className="flex items-start justify-between mb-2">
                                <p className="text-sm text-gray-900">{risk.title}</p>
                                <Badge 
                                  variant="outline"
                                  className={
                                    risk.level === 'High' ? 'bg-red-100 text-red-700 border-red-200' :
                                    risk.level === 'Medium' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                                    'bg-green-100 text-green-700 border-green-200'
                                  }
                                >
                                  {risk.level}
                                </Badge>
                              </div>
                              <p className="text-xs text-gray-600 mb-3">{risk.description}</p>
                              <div className="flex items-center gap-2 text-xs text-gray-700">
                                <User className="h-3 w-3" />
                                <span>{risk.mitigation} - {risk.mitigationRole}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Card>
            )}

            {/* Section 7: Committees and Teams */}
            {selectedNode.committees && selectedNode.committees.length > 0 && (
              <Card className="p-6 bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
                <button
                  onClick={() => toggleSection('committees')}
                  className="w-full flex items-center justify-between mb-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
                      <Users2 className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div>
                      <h4 className="text-sm text-gray-900">Committees and Teams</h4>
                      <p className="text-xs text-gray-500">Cross-functional groups and committees</p>
                    </div>
                  </div>
                  {expandedSections.committees ? <ChevronUp className="h-5 w-5 text-gray-400" /> : <ChevronDown className="h-5 w-5 text-gray-400" />}
                </button>
                
                {expandedSections.committees && (
                  <div className="space-y-4">
                    {selectedNode.committees.map((committee) => (
                      <div key={committee.id} className="p-4 bg-indigo-50 rounded-lg border border-indigo-100">
                        <h5 className="text-sm text-gray-900 mb-2">{committee.name}</h5>
                        <p className="text-xs text-gray-600 mb-3">{committee.purpose}</p>
                        
                        <div className="space-y-2 mb-3">
                          <div className="flex items-center gap-2 text-xs">
                            <Badge variant="outline" className="bg-indigo-100 text-indigo-700 border-indigo-200">
                              Chairperson
                            </Badge>
                            <span className="text-gray-700">{committee.chairperson}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
                              Coordinator
                            </Badge>
                            <span className="text-gray-700">{committee.coordinator}</span>
                          </div>
                        </div>

                        <div className="pt-3 border-t border-indigo-200">
                          <p className="text-xs text-gray-600 mb-2">Members ({committee.members.length})</p>
                          <div className="flex flex-wrap gap-2">
                            {committee.members.map((member, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {member.name}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            )}
